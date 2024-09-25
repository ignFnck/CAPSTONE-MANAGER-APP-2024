'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setLoading(true)
		setError('')

		try {
			// Hacer la petición POST a la API de login
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					API_KEY: process.env.BACKEND_API_KEY || ''
				},
				body: JSON.stringify({ email: email, password: password })
			})

			// Verificar si la respuesta fue exitosa
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Error al iniciar sesión')
			}

			const data = await response.json() // Obtener la respuesta de la API
			console.log('Login exitoso:', data) // Aquí podrías redirigir al usuario o guardar el token

			// Si el login es exitoso, puedes redirigir o manejar el estado de sesión
			router.push('/home')
		} catch (error: any) {
			// Manejo de errores
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className='fondo flex bg-Gris w-[100dvw] h-[100dvh] items-center justify-center p-24'>
			<section className='flex flex-col border-2 bg-Gris border-Amarillo/60 shadow-lg px-12 py-16 rounded-lg'>
				<div className='flex justify-center items-center mb-8'>
					<Image
						priority
						src='/SAVANNALOGOpng.png'
						alt='Vercel Logo'
						width={500}
						height={100}
						className='bg-Gris'
					/>
				</div>

				<form onSubmit={handleLogin} className='bg-Gris flex flex-col gap-4'>
					<label className='bg-Gris text-Blanco text-xl'>Usuario</label>
					<input
						className='bg-Verde text-Blanco h-9 px-2 rounded-md'
						type='email'
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label className='bg-Gris text-Blanco text-xl'>Contraseña</label>
					<input
						className='bg-Verde text-Blanco h-9 px-2 rounded-md'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button className='self-center text-2xl text-Blanco bg-Naranjo rounded-lg w-fit px-12 py-2 mt-8 transition hover:scale-105 hover:bg-Naranjo/90'>
						Iniciar Sesión
					</button>
				</form>
			</section>
		</main>
	)
}
