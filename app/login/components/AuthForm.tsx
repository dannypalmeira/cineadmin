"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";

export function AuthForm() {
	return (
		<div className="w-full space-y-5">
			<Tabs defaultValue="signin" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="signin">Login</TabsTrigger>
					<TabsTrigger value="register">Cadastrar-se</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<SignInForm />
				</TabsContent>
				<TabsContent value="register">
					<RegisterForm />
				</TabsContent>
			</Tabs>
		</div>
	);
}
