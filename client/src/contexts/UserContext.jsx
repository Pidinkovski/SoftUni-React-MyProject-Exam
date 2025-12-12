import { createContext, useState } from "react"
import useRequest from "../hooks/useRequest"

const UserContext = createContext({
    user: {
        email: "",
        _createdOn: 0,
        _id: "",
        accessToken: ""
    },
    categories: [],
    isAuthenticated: false,
    onRegisterHandler() { },
    onLoginHandler() { },
    onLogout() { }

})

const categories = {
    'workout': {
        categoryType: 'workout',
        categoryAbout: 'Workout',
        imageUrl: '/images/categoryWorkout.jpg',
        shortInfo: 'Effective and fast workouts to do at home.There will be as for all levels beginners to advance.'
    },
    'lifestyle': {
        categoryType: 'lifestyle',
        categoryAbout: 'Lifestyle',
        imageUrl: '/images/healthyLifeStyle.jpg',
        shortInfo: 'Here you can find what you can change in dayli routines and habits , to feel better.'
    },
    'food': {
        categoryType: 'food',
        categoryAbout: 'Food',
        imageUrl: '/images/healthyFood.jpg',
        shortInfo: 'You will find easy,health and simple recipies to try at home , and to adjust to your diet.'
    },
    'mindful': {
        categoryType: 'mindful',
        categoryAbout: 'Mindful Set',
        imageUrl: '/images/mindfulSet.png',
        shortInfo: 'You will find tips , about how to create a better connect between mind and body , how to meditate , how to do manifistations etc...'
    },
}

export function UserProvider({
    children
}) {

    const [user, setUser] = useState(() => {
        const currentUser = localStorage.getItem('auth')
        if (!currentUser) {
            return null
        }

        try {
            return JSON.parse(currentUser)
        } catch (err) {
            return null
        }
    })

    const setUserData = (user) => {
        if (user) {
            const userToSet = {
                email: user.email,
                accessToken: user.accessToken,
                _id: user._id,
                _createdOn: user._createdOn
            }
            localStorage.setItem('auth', JSON.stringify(userToSet))
            setUser(userToSet)

        } else {
            localStorage.removeItem('auth')
        }

    }
    const { request } = useRequest()

    async function onRegisterHandler({ email, password }) {

        const newUser = { email, password }
        try {
            const result = await request('http://localhost:3030/users/register', 'POST', newUser)
            setUserData(result)
            return result
        } catch (err) {
            throw err
        }
    }

    async function onLoginHandler({ email, password }) {
        try {
            const result = await request('http://localhost:3030/users/login', 'POST', { email, password })

            setUserData(result)
            return result

        } catch (err) {
            throw err
        }
    }

    async function onLogout() {
        try {
            await request('http://localhost:3030/users/logout', 'GET', null, { accessToken: user.accessToken })
            localStorage.removeItem('auth')
            setUser(null)

        } catch(err) {
            alert('Invalid token')
            localStorage.removeItem('auth')
            setUser(null)
        }
    }
    const contextValues = {
        user,
        onRegisterHandler,
        onLoginHandler,
        onLogout,
        isAuthenticated: !!user?.accessToken,
        categories
    }

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext