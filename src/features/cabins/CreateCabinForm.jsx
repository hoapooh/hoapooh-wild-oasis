import { useForm } from 'react-hook-form'

import { useCreateCabin } from './useCreateCabin'
import { useUpdateCabin } from './useUpdateCabin'

import Textarea from '../../ui/Textarea'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import FormRow from '../../ui/FormRow'

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	// mutation use for create new cabin
	const { isCreating, createCabin } = useCreateCabin()
	// mutation use for edit an existing cabin
	const { isUpdating, updateCabin } = useUpdateCabin()

	const isWorking = isCreating || isUpdating

	const { id: editId, ...editValues } = cabinToEdit
	const isEditSession = Boolean(editId)

	/* 
		register: write it just the same as the id of input field
		handleSubmit: provide submit function that recerive group of functions 
	*/
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	})

	// get error state of form
	const { errors } = formState

	function onSubmit(data) {
		const image =
			typeof data.image === 'object' && data.image.length > 0 ? data.image[0] : cabinToEdit.image

		if (isEditSession)
			updateCabin(
				{
					newCabinData: { ...data, image },
					id: editId,
				},
				{
					onSuccess: (data) => {
						reset(data)
						onCloseModal?.()
					},
				}
			)
		else
			createCabin(
				{ ...data, image },
				{
					onSuccess: () => {
						reset()
					},
				}
			)
	}

	// display error function
	function onError(error) {
		console.error(error)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label={'Cabin name'} error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required!',
					})}
				/>
			</FormRow>

			<FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required!',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required!',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label={'Discount'} error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					disabled={isWorking}
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required!',
						// Whatever we return from this function will be an error message
						validate: (value) =>
							Number(value) <= Number(getValues().regularPrice) ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow label={'Description for website'} error={errors?.description?.message}>
				<Textarea
					type='number'
					id='description'
					disabled={isWorking}
					defaultValue=''
					{...register('description', {
						required: 'This field is required!',
					})}
				/>
			</FormRow>

			<FormRow label={'Cabin photo'}>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isEditSession ? false : 'This field is required!',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isCreating
						? 'Creating...'
						: isUpdating
						? 'Updating...'
						: isEditSession
						? 'Edit cabin'
						: 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	)
}

export default CreateCabinForm
