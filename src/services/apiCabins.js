import supabase, { supabaseUrl } from './supabase'

export async function getCabins({ filter, sortBy }) {
	let query = supabase.from('cabins').select('*')

	if (filter) query = query[filter.method || 'eq'](filter.field, filter.value)

	if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })

	const { data, error } = await query

	if (error) {
		console.error(error)
		throw new Error('Bookings could not be loaded')
	}

	return data
}

export async function createUpdateCabin(newcabin, id) {
	// check if the image field has the supabase URL at the beginning
	const hasImagePath = newcabin.image?.startsWith?.(supabaseUrl)

	const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll('/', '')

	// If there is an image path already, just reuse it
	// If there is none, create new one
	const imagePath = hasImagePath
		? newcabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

	// 1. Create cabin
	let query = supabase.from('cabins')

	// A) Create
	if (!id) query = query.insert([{ ...newcabin, image: imagePath }])

	// B) Update
	if (id) query = query.update({ ...newcabin, image: imagePath }).eq('id', id)

	const { data, error } = await query.select().single()

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be deleted')
	}

	// 2. If 1. successful, upload image later to the bucket (storage)
	if (hasImagePath) return data

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newcabin.image)

	// 3. Delete the cabin if there was an error uploading image to bucket (storage)
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id)
		console.error(storageError)
		throw new Error('Cabin image could not be uploaded and the cabin was not created')
	}

	return data
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id)

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be deleted')
	}

	return data
}
