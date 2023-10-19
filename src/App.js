import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Show from "./components/Show";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Contact from "./pages/Contact";
import Insights from "./pages/Insights";
import Permissões from "./pages/Permissões";
import Documents from "./pages/Documents";
import Protected from "./components/Protected";
import Perfil from "./pages/Perfil";
import Logout from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./helper/prototype";
import { useRecoilValue } from "recoil";
import { loginAtom } from "./recoil/Atoms";
import ErrorPage from "./pages/ErrorPage";

function App() {
	const login = useRecoilValue(loginAtom);
	const permissions = login?.permissions;
	// console.log("permissions", permissions);
	return (
		<>
			<ToastContainer position='top-center' />

			<Routes>
				<Route path='/' element={<Show />} />
				<Route path='/error' element={<ErrorPage />} />
				<Route path='*' element={<Navigate to='error' replace />} />
				<Route
					path='/login'
					element={<Protected Component={Login} />}
				/>

				<Route
					path='/Insights'
					element={<Protected Component={Insights} />}
				/>
				{permissions?.contact ? (
					<Route
						path='/Contatos'
						element={<Protected Component={Contact} />}
					/>
				) : (
					<Route path='error' element={<ErrorPage />} />
				)}
				{permissions?.document ? (
					<Route
						path='/Documentos'
						element={<Protected Component={Documents} />}
					/>
				) : (
					<Route path='error' element={<ErrorPage />} />
				)}
				{permissions?.newAdmin ? (
					<Route
						path='/Permissoes'
						element={<Protected Component={Permissões} />}
					/>
				) : (
					<Route path='error' element={<ErrorPage />} />
				)}
				<Route
					path='/perfil'
					element={<Protected Component={Perfil} />}
				/>
				<Route
					path='/logout'
					element={<Protected Component={Logout} />}
				/>
			</Routes>
		</>
	);
}

export default App;
