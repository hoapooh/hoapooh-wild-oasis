import supabase, { supabaseUrl } from './supabase'

export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	})

	if (error) throw new Error('Signup error', { cause: error })

	return data
}

export async function login({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) throw new Error('Login error', { cause: error })

	return data
}

export async function logout() {
	const { error } = await supabase.auth.signOut()
	if (error) throw new Error('Logout error', { cause: error })
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession()

	if (!session?.session) return null

	const { data, error } = await supabase.auth.getUser()

	if (error) throw new Error('Get user error', { cause: error })

	return data?.user
}

export async function updateCurrentUser({ password, fullName, avatar }) {
	//1. update password or fullName
	//NOTE: since we are using two different forms, one updates password and other fullname. In this case password and fullname won't be needed to be updated at the same time
	let updateData
	if (password) updateData = { password }
	if (fullName) updateData = { data: { fullName } }

	const { data, error: dataUpdateError } = await supabase.auth.updateUser(updateData)

	if (dataUpdateError) throw new Error('Data update error', { cause: dataUpdateError })

	if (!avatar) return data

	//2. upload the avatar
	//check if there is an avatar image present in the bucket for this user
	const fileName = `avatar-${data.user.id}-${Math.random()}`

	const hasImage = data.user.user_metadata.avatar

	//2.1 delete the already present image
	if (hasImage) {
		const existingFilePath = data.user.user_metadata.avatar.split('/')?.at(-1)

		const { data: imageDeleteData, error: imageDeleteError } = await supabase.storage
			.from('avatars')
			.remove([existingFilePath])

		if (imageDeleteError) throw new Error('Image delete error', { cause: imageDeleteError })
		console.log('Deleted image ', imageDeleteData)
	}

	//2.2 finally upload the new image
	const { error: imageUploadError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar)

	if (imageUploadError) throw new Error('Image upload error', { cause: imageUploadError })

	//3.update avatar field in user
	const { data: avatarUpdatedData, error: avatarUpdateError } = await supabase.auth.updateUser({
		data: {
			fullName,
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	})

	if (avatarUpdateError) throw new Error('Avatar update error', { cause: avatarUpdateError })

	return avatarUpdatedData
}
