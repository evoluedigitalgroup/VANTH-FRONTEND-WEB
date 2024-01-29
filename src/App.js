import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Show from "./components/Show";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Contract from "./pages/Contract";
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
import { Suspense } from "react";
import DocumentCard from "./pages/DocumentCard";
import Clients from "./pages/Clients";
import MyPlan from "./components/MyPlan/MyPlan";
import PurchasePlan from "./components/PurchasePlan";
import RequestedSignature from "./pages/RequestedSignature";
import DocuSignReturn from "./pages/DocuSignReturn";

function App() {
  const login = useRecoilValue(loginAtom);
  const permissions = login?.permissions;
  return (
    <>
      <ToastContainer position="top-center" />

      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        <Route path="/" element={<Show />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="error" replace />} />
        <Route path="/login" element={<Protected Component={Login} />} />

        <Route path="/Insights" element={<Protected requiredPlan Component={Insights} />} />
        <Route path="/clientes" element={<Protected requiredPlan Component={Clients} />} />
        {permissions?.contract ? (
          <Route path="/contratos" element={<Protected requiredPlan Component={Contract} />} />
        ) : (
          <Route path="error" element={<ErrorPage />} />
        )}
        {permissions?.document ? (
          <Route
            path="/documentos"
            element={<Protected requiredPlan Component={Documents} />}
          />
        ) : (
          <Route path="error" element={<ErrorPage />} />
        )}
        {permissions?.newUser ? (
          <Route
            path="/Permissoes"
            element={<Protected requiredPlan Component={Permissões} />}
          />
        ) : (
          <Route path="error" element={<ErrorPage />} />
        )}
        <Route path="/perfil" element={<Protected Component={Perfil} />} />
        {
          //  purchaseType = "plan" or "package"
          //  planId = "plan id" or "package id"
        }
        <Route
          path="/perfil/my-plan/purchase/:purchaseType/:purchaseId"
          element={<Protected Component={PurchasePlan} />}
        />
        <Route
          path="/perfil/my-plan"
          element={<Protected Component={MyPlan} />}
        />
        <Route path="/logout" element={<Protected Component={Logout} />} />
        <Route
          path="/document-verification/:companyId/:contactId/:requestId"
          element={<DocumentCard />}
        />
        <Route
          path="/requested-signature/:companyId/:contractId/:docusignEnvelopeId"
          element={<RequestedSignature />}
        />
        <Route
          path="/contract/docusign/return-url"
          element={<DocuSignReturn />}
        />
      </Routes>
      {/* </Suspense> */}
    </>
  );
}

export default App;
