import Background from "../../assets/login.png";
import Victory from "../../assets/logo.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      if (validateSignup()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-black">
      <div
        className="h-[80vh] bg-black  
        border-2 border-purple-800 
        text-opacity-90 shadow-2xl shadow-purple-500
        w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] 
        rounded-3xl grid xl:grid-cols-2 
        transition-all duration-500 ease-in-out 
        hover:shadow-[0_0_30px_10px_rgba(147,51,234,0.8)] hover:border-purple-600"
      >
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Welcome
              </h1>
              <img src={Victory} className="h-[80px] logo-appear" />
            </div>
            <p className="font-medium text-center text-purple-500">
             To Syncronus <br /></p><p className="font-medium text-center text-gray-300">
              Fill in the details to get started with Syncronus!!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent
                  text-white text-opacity-90 border-b-4 border-black   
                  rounded-none w-full data-[state=active]:text-white  
                  data-[state=active]:font-bold 
                  data-[state=active]:border-b-purple-500 
                  p-3 transition-all duration-400"
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent 
                  text-white text-opacity-90 border-b-4 
                  border-black rounded-none w-full 
                  data-[state=active]:text-white  
                  data-[state=active]:font-bold 
                  data-[state=active]:border-b-purple-500 p-3 
                  transition-all duration-400"
                  value="signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 mt-10 ">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 relative input-fill" style={{ animationDelay: "0.5s" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 relative input-fill" style={{ animationDelay: "0.5s" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6 relative input-fill" style={{ animationDelay: "0.5s" }} onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 relative input-fill" style={{ animationDelay: "0.5s" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 relative input-fill" style={{ animationDelay: "0.5s" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6 relative input-fill" style={{ animationDelay: "0.5s" }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6 relative input-fill" style={{ animationDelay: "0.5s" }} onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} className="h-[500px]" />
        </div>
      </div>

      
      <style>
        {`
          
          .logo-appear {
            opacity: 0;
            animation: fadeIn 0.5s ease-in forwards;
            animation-delay: 0.3s; /* Delay matches the typing animation duration */
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Auth;