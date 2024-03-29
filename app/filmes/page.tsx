import React from "react";
import CreateForm from "./components/CreateForm";
import { Button } from "@/components/ui/button";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
import SignOut from "./components/SignOut";
import { cancelarFilmeById, lerFilme, atualizarFilmeById } from "./actions";

export default async function Page() {
	const {data} = await readUserSession();

	if(!data.session){
		return redirect("/login")
	}

	const {data:todos} = await lerFilme();

	return (
		<div className="max-w-5xl w-full justify-between font-mono text-sm lg:flex">
			<div className="mb-32 flex text-center lg:max-w-5xl">
				<SignOut />
				<CreateForm />
				</div>
				<div className="max-w-5xl w-full items-center">

				{todos?.map((todo, index) => {

					const cancelarFilme = cancelarFilmeById.bind(null, todo.id);
					const atualizarFilme = atualizarFilmeById.bind(null, todo.id,!todo.completed);

					return (
						<div key={index} className="mb-32 flex items-center gap-6">
							<div className="group rounded-lg border px-5 py-4 border-gray-300 bg-gray-100">
							<img src={todo.imagem} />
							<h2
								className={`mb-3 text-2xl font-semibold ${todo.completed ? 'line-through' : ''}`}> 
								{todo.titulo}								
							</h2>
							<p><strong>Genero:</strong> {todo.genero}</p>
							<p><strong>Ano:</strong> {todo.ano}</p>
							<p><strong>Discrição:</strong> {todo.descricao}</p>
							</div>

							<form action={cancelarFilme}>
							<Button>Cancelar</Button>
							</form>

							<form action={atualizarFilme}>
							<Button>Favorito</Button>								
							</form>
							
							
						</div>
					);
				})}
			</div>
		</div>
	);
}
