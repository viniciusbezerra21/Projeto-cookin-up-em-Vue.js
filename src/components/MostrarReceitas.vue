import { async } from '../http/index';
<script lang="ts">
import type { PropType } from 'vue';
import { obterReceitas } from '@/http';
import BotaoPrincipal from './BotaoPrincipal.vue';
import CardReceitas from './CardReceitas.vue';
import type IReceitas from '@/interfaces/IReceitas';
import { itensDeLista1EstaoEmLista2 } from '@/operacoes/listas';


    export default {
        props: {
            ingredientes: { type: Array as PropType<string[]>, required: true }
        },

        data() {
            return {
                receitasEncontradas: [] as IReceitas[]
            }
        },
        async created(){
            const receitas = await obterReceitas();

            this.receitasEncontradas = receitas.filter((receita) => {
                // Logica que verifica se posso fazer receita:
                // Todos os ingredientes de uma receita devem estart inclusos na lista de ingredientes
                //  Se sim, devemos retornar 'True'

                const possoFazerReceita = itensDeLista1EstaoEmLista2(receita.ingredientes, this.ingredientes);

                return possoFazerReceita;
            });
        },
        components: { CardReceitas, BotaoPrincipal },
        emits: ['editarReceitas']
    }
</script>
 <template>
    <section class="mostrar-receitas">
        <h1 class="cabecalho titulo-receitas">Receitas</h1>

        <p class="paragrafo-lg resultados-encontrados">
            Resultados encontrados: {{ receitasEncontradas.length }}
        </p>

        <div v-if="receitasEncontradas.length" class="receitas-wraper">
            <p class="paragrado-lg informacoes">
                Veja as opções de receitas que encontramos com os ingredientes que você tem por aí!
            </p>

            <ul class="receitas">
                <li v-for="receita of receitasEncontradas" :key="receita.nome">
                    <CardReceitas :receita="receita" />
                </li>
            </ul>
        </div>

        <div v-else class="receitas-nao-encontradas">
            <p class="paragrafo-li receitas-nao-encontradas__info">
                 Ops, não encontramos resultados para sua combinação. Vamos tentar de novo?
            </p>

            <img src="../assets/imagens/sem-receitas.png" alt="Desenho de um ovo quebrado. A gema tem um rosto com uma expressão triste.">
        </div>

        <BotaoPrincipal texto="Editar lista" @click="$emit('editarReceitas', $event)" />
    </section>
 </template>

 <style scoped>
.mostrar-receitas{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.titulo-receitas{
    color: var(--verde-medio);
    margin: 1.5rem;
}

.resultados-encontrados{
    color: var(--verde-medio);
    margin-bottom: 0.5rem;
}

.receitas-wraper{
    margin-bottom: 3.5rem;
}

.informacoes{
    margin-bottom: 2rem;
}

.receitas{
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.receitas-nao-encontradas{
    margin-bottom: 2rem;
}

.receitas-nao-encontradas__info{
    margin-bottom: 0.5rem;
}

@media only screen and (max-width: 767px) {
  .receitas-wrapper {
    margin-bottom: 2rem;
  }
}
 
</style>