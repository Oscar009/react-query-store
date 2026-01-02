import { Button, Image, Input, Textarea } from "@nextui-org/react";
// import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useProductMutation from "../hooks/useProductMutation";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  // const [tempImage, setTempImage] = useState('');

  const productMutation = useProductMutation();

  // const productMutation = useMutation({
  //   mutationFn: productsActions.createProduct,
  // })

  const {
    control,
    handleSubmit,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: 'Mi producto',
      price: 0,
      description: 'Descripcion del producto',
      category: 'Electronics',
      image: 'https://imgs.search.brave.com/mhp8mNYDtaY-ZflZmEj1Z-FDmTBBwS7s1YYbi1voN6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS90ZWNsYWRvLXBj/LWF6dWwtY2xhc2lj/b18xNzU2ODItMTc1/NjguanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MCZxPTgw',
    }
  });

  const newImage = watch('image');

  // useEffect(() => {
  //   setTempImage(newImage);
  // }, [newImage]);

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    productMutation.mutate(data);
  }

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex justify-around items-center">

          <div className="flex-col w-[500px]">

            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input className="mt-2" type="text" label="Titulo del producto" {...field} />}
            />
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input className="mt-2" type="number" label="Precio del producto" {...field} value={String(field.value)} onChange={(e) => field.onChange(Number(e.target.value))} />}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => <Input className="mt-2" type="url" label="Url del producto" {...field} />}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea className="mt-2" label="Descripcion del producto" {...field} />}
            />
            <select className="rounded-md p-3 mt-2 bg-gray-800 w-full">
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>

            <br />
            <Button
              type="submit"
              className="mt-2"
              color="primary"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? 'Creando...' : 'Crear Producto'}
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-10 flex items-center" style={{
            width: '500px',
            height: '600px',
          }}>

            <Image
              src={newImage}
            />
          </div>

        </div>


      </form>

    </div>
  )
}