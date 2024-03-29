import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LazyMotion, m, domAnimation, useMotionValue } from "framer-motion"

import ErrorBoundary from "../errors/errorBoundary";
import Navbar from "../components/navbar";

const Root = () => {
	const pathname = useLocation().pathname
	
	const [theme, setTheme] = useState('dark')
	useEffect(() => {
		document.querySelector('html').setAttribute('data-theme', theme);
	}, [theme])


	// loading animation dynamic import component
	const scaleX = useMotionValue(0, {
      stiffness: 900, 
      damping: 90
   })
	const { state } = useNavigation()
	useEffect(() => {
		if (state != 'idle') {
			let i = 0
			const speed = Math.random() * (0.05 - 0.01) + 0.01
			const end = Math.random() * (0.85 - 0.55) + 0.55

			var loadingAnimation = setInterval(() => {
				if (i >= end) clearInterval(loadingAnimation)
				scaleX.set(i += speed)
			}, 10)
		} else {
			clearInterval(loadingAnimation)
			scaleX.set(1)
		}
	}, [state])


	return (
		<ErrorBoundary fallback={<p>Error</p>}>
			<LazyMotion features={domAnimation}>
				<m.div
					style={{
						scaleX
					}}

					className={`${state == 'idle' ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'} origin-left w-full left-0 fixed top-0 h-[0.1rem] z-[999999] bg-gradient-to-r from-cyan-700 to-cyan-400`}
				/>

				{
					pathname != '/login' & 
					!pathname.includes('/admin') ? 
						<Navbar theme={[theme, setTheme]} /> : ''
				}

				<Outlet context={{theme: [theme, setTheme]}} />
			</LazyMotion>
		</ErrorBoundary>
	)
}
export default Root