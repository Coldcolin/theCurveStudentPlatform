import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
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
import Punctuality from "./pages/CheckIn/Punctuality";
import Message from "./pages/MessageUs/Message";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import AssessmentSubmission from "./pages/Assessment/AssessmentSubmission";
import AssessmentSubmitionTutorView from "./pages/Tutors/AssessmentSubmitionTutorView";





const router = createHashRouter([
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
        path: "punctuality/:id",
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <Punctuality />
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
        path: "message-us",
        element: <RequireAuth />,
        children:[
          {
            index: true,
            element: <Message />
          },
        
        ]
      },
      {
        path: "assessment-submition/:id",
        element: <RequireAuth />,
        children:[
          {
            index: true,
            element: <AssessmentSubmission />
          },
        
        ]
      },
      {
        path: "assessment-submition-tutorView/:studentId",
        element: <RequireAuth />,
        children:[
          {
            index: true,
            element: <AssessmentSubmitionTutorView />
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
    path: 'reg045678',
    // errorElement: <ErrorPage/>,
    element:<Registration/>,
  },
  {
    path: 'success',
    // errorElement: <ErrorPage/>,
    element:<SuccessPage/>,
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
