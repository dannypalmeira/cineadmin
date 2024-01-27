"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function criarFilme(titulo: string, descricao: string, genero: string, ano: string, imagem: string){
    const supabase = await createSupabaseServerClient();    
    const { data: { user } } = await supabase.auth.getUser()
    const result = await supabase.from("filmes").insert([{titulo,descricao,genero,ano,imagem,created_by:user?.id}]).single();
    revalidatePath("/filmes");
    return JSON.stringify(result);
}

export async function lerFilme() {
    noStore();
    const supabase = await createSupabaseServerClient();
    return await supabase.from("filmes").select("*");
}

export async function cancelarFilmeById(id: string) {
    const supabase = await createSupabaseServerClient();
    await supabase.from("filmes").delete().eq("id", id);
    revalidatePath("/filmes");

}

export async function atualizarFilmeById(id: string, completed: boolean) {
    const supabase = await createSupabaseServerClient();
    await supabase.from("filmes").update({completed}).eq("id", id);
    revalidatePath("/filmes");
}


export async function buscarFilme (){
    const supabase = await createSupabaseServerClient();
    const { data: video, error } = await supabase
.from('filmes')
.select("*")
// Filters
.eq('column', 'Equal to')
.gt('column', 'Greater than')
.lt('column', 'Less than')
.gte('column', 'Greater than or equal to')
.lte('column', 'Less than or equal to')
.like('column', '%CaseSensitive%')
.ilike('column', '%CaseInsensitive%')
.is('column', null)
.in('column', ['Array', 'Values'])
.neq('column', 'Not equal to')
// Arrays
.contains('array_column', ['array', 'contains'])
.containedBy('array_column', ['contained', 'by'])
revalidatePath("/filmes");
}