import Hero from '../components/Hero'
import Newsletter from '../components/Newsletter'
import Trending from '../components/Trending'
import FetchHeros from '../utils/FetchHeros'
import { feature, Item, User } from '../typings'
import FetchQueryItems from '../utils/FetchQueryItems'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useStateContext } from '../context/stateContext'
import toast from 'react-hot-toast'
import { useCookies } from 'react-cookie';

interface Props {
  features: feature[],
  items:Item[]
}

const Home = ({features, items}:Props) => {
  const {data:session} = useSession()
  const {setUser, user,setCartTotal, setorders} = useStateContext()
  const [cookies, setCookie, removeCookie] = useCookies();

  const loginUser = async () => {
    const alreadyUser = await fetch(`http://localhost:3000/api/findUser?email=${session?.user?.email}`)
    const alreadyUserResp = await alreadyUser.json()

    if (!alreadyUserResp.user){
      const body = ({
        name: session?.user?.name ,
        img: session?.user?.image,
        email: session?.user?.email
      })

      const newUser = await fetch(`http://localhost:3000/api/createUser`, {
        method:'POST',
        body: JSON.stringify(body)
      })
      const newUserResp = await newUser.json()
      setUser(
        {
          name: session?.user?.name,
          email: session?.user?.email,
          img: session?.user?.image,
          _id: newUserResp.user._id
        }
      )
    } else {
      setUser(
        {
          name: session?.user?.name,
          email: session?.user?.email,
          img: session?.user?.image,
          _id: alreadyUserResp.user._id
        }
      )
    }
    return 
  }

  useEffect(() => {
    if (session?.user) {
    loginUser()
  }
  }, [session])


const setOrderToPaid = async() => {
  const resp = await fetch ('http://localhost:3000/api/setOrderToPaid', {
    method:'POST',
    body: cookies.orderId
  })

  const data = await resp.json()
}

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success') && cookies.orderId ) {
      toast('Order placed! You will receive an email confirmation.');
      console.log('found cookie')
      setOrderToPaid()
      setorders([])
      setCartTotal(0)
    }
    if (query.get('canceled')) {
      toast('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
  
  return (
      <div className='w-full h-full '>
        <div className='h-96' >
        <Hero feature={features[0]} />
        </div>
        <Trending items={items} />
        <div className='flex mb-10 flex-col md:flex-row md:space-y-0 space-y-5' >
          <div className='w-full md:pr-2 md:w-3/6 h-[300px]'>
          <Hero feature={features[1]}/>
          </div>
          <div className='w-full md:pl-2 md:w-3/6 h-[300px]'>
          <Hero feature={features[2]}/>
          </div>
        </div>
        <div className='h-[500px] w-full mt-[60px] md:mt-20'>
          <Hero feature={features[3]}/>
        </div>
        <Newsletter/>
      </div>

  )
}

export const getServerSideProps = async () => {
  const features = await FetchHeros()
  const tag = ''
  const filter = ''
  const items = await FetchQueryItems(tag, filter)
  return (
  {  props:{
      features,
      items
    }}
  )
}

export default Home
