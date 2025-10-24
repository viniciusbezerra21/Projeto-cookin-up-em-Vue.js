import listaIngredientes from '@/data/lista-ingredientes.json';
import listaReceitas from '@/data/lista-receitas.json';
import type ICategoria from '@/interfaces/ICategoria';
import type IReceitas from '@/interfaces/IReceitas';

export async function obterCategorias() {
    // Simula um fetch com Promise
    const categorias: ICategoria[] = listaIngredientes;
    return categorias;
}

export async function obterReceitas() {
    // Simula um fetch com Promise
    const receitas: IReceitas[] = listaReceitas;
    return receitas;
}