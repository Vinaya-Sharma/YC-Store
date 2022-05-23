import { getProviders, signIn } from "next-auth/react"

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div className="relative space-y-5 h-[90vh] center justify-center  flex flex-col place-items-center" key={provider.name}>
          <h1 className="lgTitle text-3xl text-ycDblue">Welcome To The Youth Culture Store</h1>
          <button className="bg-ycDblue px-5 py-3 flex rounded-lg text-white" onClick={() => signIn(provider.id)}>
            Sign in with {provider.name} <img className="w-6 h-6 ml-2" src="https://cdn.cognitiveseo.com/blog/wp-content/uploads/2017/10/1000px-Google_-G-_Logo.svg_.png" />
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}