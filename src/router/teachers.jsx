import { useLoaderData, useOutletContext } from "react-router-dom"
import TitlePage from "../components/titlePage"
import UiErrorFetching from "../components/uiErrorFetching"
import ErrorLoaderApi from "../errors/errorLoaderApi"
import { m, useSpring } from "framer-motion";
import icons from "../components/icons";

const CardLooping = ({ item, theme }) => {
	const springOptions = {
		stiffness: 500,
		damping: 90,
	};

	const x = useSpring(0, springOptions);
	const y = useSpring(0, springOptions);
	const handdleMouse = (ev) => {
		x.set(ev.nativeEvent.layerX - 192);
		y.set(ev.nativeEvent.layerY - 230);
	};

	return (
		<>
			<div className="min-w-96 pl-5 pt-5">
				<div
					title="klik untuk melihat detail"
					onMouseMove={handdleMouse}
					onClick={() =>
						document.getElementById(`detail-guru-${item.id}`).showModal()
					}
					className="group hover:-translate-y-1 hover:shadow-lg transition-[box-shadow,_transform]  duration-300 cursor-pointer relative h-28 bg-base-300/50 rounded-xl"
				>
					<div className="pointer-events-none absolute z-10 -translate-x-1/4 -translate-y-1/4 border-[5px] border-base-100 w-20 h-20 bg-gray-700 rounded-full">
						<img
							src={item.foto_profil}
							className="w-full h-full rounded-full object-cover"
						/>
					</div>

					<div className="p-0.5 h-full rounded-[inherit] overflow-hidden relative">
						<div className={`${theme == 'dark' ? 'bg-base-300/90' : 'bg-base-300/80'} pointer-events-none z-50 rounded-[inherit] h-full`}>
							<div className="ml-20 pt-4 pr-6 mb-auto z-10">
								<h1 className="font-bold">{item.nama}</h1>
								<p className="text-current/50 text-sm">{item.jabatan}</p>
							</div>
						</div>
						<m.div
							style={{
								background: `radial-gradient(${theme == 'dark' ? 'cyan' : '#b35cff'}, transparent 50%)`,
								x,
								y,
							}}
							className={`${theme == 'dark' ? 'group-hover:opacity-50' : 'group-hover:opacity-100'} w-96 h-96 -z-10 pointer-events-none opacity-0 transition-opacity self-center duration-500 absolute blur-md rounded-full`}
						/>
					</div>
				</div>
			</div>

			<dialog id={`detail-guru-${item.id}`} className="modal">
				<div className="modal-box h-[37rem] flex flex-col items-stretch">
					<form method="dialog">
						<button className="fixed btn btn-sm btn-circle btn-ghost right-2 top-2">
							✕
						</button>
					</form>

					<div className="flex flex-col items-center self-center p-6">
						<h1 className="font-bold text-lg mb-4">{item.nama}</h1>
						<div className="avatar mb-4">
							<div className="w-32 rounded-full">
								<img src={item.foto_profil} />
							</div>
						</div>
						<p className="font-bold text-center">{item.mapel}</p>
					</div>

					<div className="text-center">
						<p>Hobi. {item.hoby}</p>
						<a target="_blank" className="inline-block mt-4 mb-8" href={item.sosmed}><icons.instagram width={30} height={30} /></a>
					</div>

					<div className="w-11/12 p-3 bg-base-300 rounded-xl self-center ">
						<p>
							<span className="text-3xl font-black float-left mr-2">"</span>
							{item.motto_hidup}
							<span className="text-3xl font-black float-right ml-2">"</span>
						</p>
					</div>
				</div>

				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
};

export const Teachers = () => {
   /**@type {Array} */
   const dataGuru = useLoaderData()
   const [theme, _] = useOutletContext().theme
   
   return (
      <main className="flex flex-col justify-center items-center px-4">
         <TitlePage title='Guru-guru' content='di Jurusan' />

         <ErrorLoaderApi
            fallback={<UiErrorFetching />}
            data={dataGuru}
            childern={data => (
               <div className="max-w-[76rem] w-full grid grid-cols-1 card-md:grid-cols-2 card-lg:grid-cols-3 gap-4">
                  {data.map(item => <CardLooping item={item} key={item.id} theme={theme} />)}
               </div>
            )}
         />
      </main>
   )
}