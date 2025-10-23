import listaIngredientes from '@/data/lista-ingredientes.json';
import type ICategoria from '@/interfaces/ICategoria';

export async function obterCategorias() {
    // Simula um fetch com Promise
    const categorias: ICategoria[] = listaIngredientes;
    return categorias;
}
