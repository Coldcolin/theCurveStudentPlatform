import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css'
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Home from "./pages/Home/Home";
import AllStudents from "./pages/AllStudents/AllStudents";
import Detail from "./pages/UserProfile/Detail";
import AllTutors from "./pages/Tutors/AllTutors";
import Alumni from "./pages/Alumni/Alumni";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Assessment from "./pages/Assessment/Assessment";
import UserProfile from "./pages/UserProfile/UserProfile";
import RequireAuth from "./components/Auth/RequireAuth"
import ForgotPassword from "./pages/Recovery/ForgotPassword"
import ResetPassword from "./pages/Recovery/ResetPassword"
import Upload from "./Upload/Upload";
import Punctuality from "./pages/CheckIn/uploadImage";





const router = createBrowserRouter([
  {
    path: '/',
    // errorElement: <ErrorPage/>,
    element:<DashboardLayout/>,
    children:[
      {
        index: true,
        element: <Home />,
      },
      {
        path: "students",
        element: <AllStudents />,
      },
      
      {
        path: "detail/:id",
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <Detail />
          },
        ]
      },
      {
        path: "user",
        element: <RequireAuth />,
        children:[
          {
            index: true,
            element: <UserProfile />
          },
        
        ]
      },
      {
        path: "upload",
        element: <RequireAuth />,
        children:[
          {
            index:  true,
            element : <Upload/>
          },
        
        ]
      },
      {
        path: "tutors",
        element: <AllTutors />,
      },
      {
        path: "alumni",
        element: <Alumni />,
      },
      {
        path: "assessment",
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <Assessment />
          }
        ]
      },
      {
        path: "/checkin",
        element: <Punctuality />
      }
    ]
  },
  {
    path: 'login',
    // errorElement: <ErrorPage/>,
    element:<Login/>,
  },
  {
    path: 'forgot',
    // errorElement: <ErrorPage/>,
    element:<ForgotPassword/>,
  },
  {
    path: 'reset/:id',
    // errorElement: <ErrorPage/>,
    element:<ResetPassword/>,
  },
  {
    path: 'reg04',
    // errorElement: <ErrorPage/>,
    element:<Registration/>,
  },
  
])

function App() {
  

  // const { loading, error, data } = useQuery(GET_USERS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
