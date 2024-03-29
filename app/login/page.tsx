import React from "react";
import { AuthForm } from "./components/AuthForm";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function page() {

	const {data} = await readUserSession()

	if(data.session){
		return redirect("/filmes")
	}

	return (
					<div className="w-96">
				<AuthForm />
			</div>
	);
}
