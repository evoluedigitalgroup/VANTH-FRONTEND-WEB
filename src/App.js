import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./helper/prototype";
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";

import Show from "./pages/Landing";
import Login from "./pages/Login";

import { loginAtom } from "./recoil/Atoms";

import Contract from "./pages/Contract";
import Insights from "./pages/Insights";
import Permission from "./pages/Permission";
import Documents from "./pages/Documents";
import Protected from "./components/Protected";
import Perfil from "./pages/Perfil";
import Logout from "./pages/Logout";
import ErrorPage from "./pages/ErrorPage";
import Clients from "./pages/Clients";
import MyPlan from "./pages/MyPlan";
import PurchasePlan from "./pages/PurchasePlan";
import RequestedSignature from "./pages/Public/RequestedSignature";
import DocuSignReturn from "./pages/DocuSignReturn";
import DocumentVerification from "./pages/Public/DocumentVerification";

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

        <Route path="/insights" element={<Protected requiredPlan Component={Insights} />} />
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
            path="/permissoes"
            element={<Protected requiredPlan Component={Permission} />}
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
          element={<Protected captureUrlToRedirect Component={PurchasePlan} />}
        />
        <Route
          path="/perfil/my-plan"
          element={<Protected Component={MyPlan} />}
        />
        <Route path="/logout" element={<Protected Component={Logout} />} />
        <Route
          path="/document-verification/:companyId/:contactId/:requestId"
          element={<DocumentVerification />}
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
