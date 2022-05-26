import React from 'react'

const Blogs = () => {
  return (
    <div className='container mx-auto'>
         <div className=' text-4xl pb-5 font-bold text-primary text-center '>BLOGS</div>
            <hr /> 
            <div className="card w-full bg-base-100 ">
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-2xl font-bold text-primary">How will you improve the performance of a React Application?</h2>
                    <p className='font-bold text-justify lg:text-lg text-xs'>
                    There are many ways to do this. We can reduce unnecessary re-rendering, divide website into small components ,use less dependency, doing state management perfectly using context API or some frameworks like Redux, Memorizing using useMemo, Lazy loading is also a good method which also increase user experience.    
                    </p>
                </div>
            </div>
            <div className="card w-full bg-base-100 ">
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-2xl font-bold text-primary">What are the different ways to manage a state in a React application?</h2>
                    <p className='font-bold text-justify lg:text-lg text-xs'>
                    There are many ways to manage state in react application. There are some types of states like local state, global state, server state.If we want to manage local state useState will do the work.In case of global state Context API or redux will help.For server state means dealing with server react query can help us.                    </p>
                </div>
            </div>

            <div className="card w-full bg-base-100 ">
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-2xl font-bold text-primary">How does prototypical inheritance work?</h2>
                    <p className='font-bold text-justify lg:text-lg text-xs'>
                    In javascript prototypical inheritance helps to inherit from other objects if value is not available on present object. Suppose we have an object “bird” which has property “fly” and another object “fish” which has property “swim” . if first objects [[prototype]] property pointed to second object then if we want to read “swim” property from the “bird” object. Then it will take that data from “fish” object as “bird” don’t have swim property. This is how prototypical inheritance works.   
                   </p>
                </div>
            </div>
            
            <div className="card w-full bg-base-100 ">
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-2xl font-bold text-primary">{`Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts.`}</h2>
                    <p className='font-bold text-justify lg:text-lg text-xs'>
                    Mainly react manage state in its own way.useState gives us two things first one is state and second one is setter function to set that data. If we don’t update state with its setter function react state management will not be triggered. means there will be no re rendering. In other words, we can say that if we update state directly our value won’t be update across the application.
                   </p>
                </div>
            </div>

            <div className="card w-full bg-base-100 ">
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-2xl font-bold text-primary">You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>
                    <p className='whitespace-pre-line font-bold lg:text-lg text-xs'>
                    {`
                         const product =[
                            {name:"nokia i8",
                            price:"500$",
                            desc:"camera 13 mpx"
                            },
                            {name:"apple iphone 12X",
                            price:"1200$",
                            desc:"camera 16 mpx"
                            },
                            
                            {name:"apple Iphone 11",
                            price:"1000$",
                            desc:"camera 12 mpx"
                            },
                            ]
                        const search  ="iPhoNe"
                        const found = product.filter(
                                (item)=>
                                item.name.toLowerCase()
                                .includes(search.toLowerCase()
                                )
                            )
                        found.forEach(
                            (item)=>
                            console.log(item.name)
                            )
                        
                        `}
                   </p>
                </div>
            </div>
            <div className="card w-full bg-base-100 ">
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-2xl font-bold text-primary">What is a unit test? Why should write unit tests?</h2>
                    <p className='font-bold text-justify lg:text-lg text-xs'>
                    A unit testing means testing a small part of a whole application. unit testing is important for large project . it helps to find bugs easily. And make product more efficient. For example, if we write a component on react and we do unit testing on it. We should check if each and every function gives us expected output. It will helps us to make our application more efficient 
                   </p>
                </div>
            </div>
    </div>
  )
}

export default Blogs