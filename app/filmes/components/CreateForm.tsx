"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { criarFilme } from "../actions";
import React from "react";

const FormSchema = z.object({
	titulo: z.string().min(3, {
		message: "Campo obrigatório.",
	}),
	descricao: z.string().min(3, {
		message: "Campo obrigatório.",
	}),
	genero: z.string().min(3, {
		message: "Campo obrigatório.",
	}),
	ano: z.string().min(3, {
		message: "Campo obrigatório.",
	}),
	imagem: z.string().min(3, {
		message: "Campo obrigatório.",
	}),
});

export default function CreateForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			titulo: "",
			descricao: "",
			genero: "",
			ano:"",
			imagem:"",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () =>{
			const result = await criarFilme(data.titulo,data.descricao,data.genero,data.ano,data.imagem)
			const { error } = JSON.parse(result);
			
			if (!error?.message){
				toast({
					title: "Filme adicionado com sucesso.",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{data.titulo} is created</code>
						</pre>
					),
				});
				form.reset();
			}	
		});		
	}
	

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="titulo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Adicionar Filme</FormLabel>
							<FormControl>
								<Input
									placeholder="Titulo"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="descricao"
					render={({ field }) => (
						<FormItem>							
							<FormControl>
								<Input
									placeholder="descrição"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="genero"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="genero"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ano"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="ano"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="imagem"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="imagem"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full flex gap-2">
					Salvar
					<AiOutlineLoading3Quarters className={cn("animate-spin",{ hidden: !isPending })} />
				</Button>
			</form>
		</Form>
	);
}
