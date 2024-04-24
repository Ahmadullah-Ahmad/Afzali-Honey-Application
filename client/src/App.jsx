import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import DarkModeProvider from "./Context/DarkModeContext";
import SideProvider from "./Context/SideBar";
import { Spinner } from "@material-tailwind/react";
import AdvertismentDetails from "./Pages/AdvertismentDetails";
import ContactPage from "./Pages/ContactPage";
import About from "./Pages/About";

// pages
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Purchase = lazy(() => import("./Pages/Purchase"));
const Expense = lazy(() => import("./Pages/Expense"));
const Sales = lazy(() => import("./Pages/SalesProduct"));
const KeepHoney = lazy(() => import("./Pages/KeepHoney"));
const Customer = lazy(() => import("./Pages/Customer"));
const CustomerDetails = lazy(() => import("./Pages/CustomerDetails"));
const AppLayout = lazy(() => import("./UI/AppLayout"));
const DashboardLayout = lazy(() => import("./UI/DashboardLayout"));
const PageNotFound = lazy(() => import("./UI/PageNotFound"));
const User = lazy(() => import("./Pages/User"));
const Branch = lazy(() => import("./Pages/Branch"));
const KeepDatails = lazy(() => import("./Pages/KeepDetails"));
const Report = lazy(() => import("./Pages/Report"));
const Account = lazy(() => import("./Pages/Account"));
const Product = lazy(() => import("./Pages/Product"));
const Protector = lazy(() => import("./UI/Protector"));
//

const queryClint = new QueryClient({ defaultOptions: { staleTime: 0 } });

function App() {
  return (
    <QueryClientProvider client={queryClint}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkModeProvider>
        <SideProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <Spinner
                  className="h-16 w-16 fixed  top-[50%] left-[50%] "
                  color="blue"
                />
              }
            >
              <Routes>
                <Route element={<AppLayout />}>
                  <Route
                    index
                    element={<Navigate to="home" replace="true" />}
                  />
                  <Route path="home" element={<Home />} />
                  <Route path="home/:id" element={<AdvertismentDetails />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="about" element={<About />} />
                </Route>
                <Route
                  element={
                    <Protector>
                      <DashboardLayout />
                    </Protector>
                  }
                >
                  <Route index element={<Navigate to="dashboard/home" />} />
                  <Route path="dashboard/home" element={<Dashboard />} />
                  <Route path="dashboard/sales" element={<Sales />} />
                  <Route path="dashboard/service" element={<KeepHoney />} />
                  <Route path="dashboard/customer" element={<Customer />} />
                  <Route
                    path="dashboard/customer/:id/details"
                    element={<CustomerDetails />}
                  />
                  <Route
                    path="dashboard/service/:id/details"
                    element={<KeepDatails />}
                  />

                  <Route path="dashboard/get" element={<Purchase />} />
                  <Route path="dashboard/product" element={<Product />} />
                  <Route path="dashboard/report" element={<Report />} />
                  <Route path="dashboard/spend" element={<Expense />} />
                  <Route path="dashboard/user" element={<User />} />
                  <Route path="dashboard/branch" element={<Branch />} />
                  <Route path="dashboard/account" element={<Account />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SideProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 1000,
            },
            error: {
              duration: 2000,
            },
            style: {
              fontSize: "20px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "bg-gray-50",
              color: "bg-gray-700",
              zIndex: "revert-layer",
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
