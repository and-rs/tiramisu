import { createAsync, query } from "@solidjs/router"
import axios from "axios"
import { For, Show } from "solid-js"

interface Products {
  products: {
    title: string
    images: {
      url: string
    }[]
  }[]
}

const getProducts = query(async () => {
  "use server"
  try {
    const response = await axios.request({
      // [NOTE] testing purposes
      url: "http://localhost:9000/store/products",
      method: "get",
      headers: {
        "x-publishable-api-key": "hola",
      },
    })
    return (await response.data) as Products
  } catch (error) {
    console.log(error)
  }
}, "products")

export const route = {
  preload: () => getProducts(),
}

export default function Catalogue() {
  const products = createAsync(async () => getProducts())

  return (
    <div>
      <h1 class="text-3xl font-medium">Catalogue</h1>
      <hr />

      <Show when={products()} fallback={<p>no items</p>}>
        <For each={products()?.products}>
          {(product) => (
            <div class="border">
              <span>{product.title}</span>
              <For each={product.images}>
                {(image) => <img class="size-7" src={image.url} />}
              </For>
            </div>
          )}
        </For>
      </Show>
    </div>
  )
}
