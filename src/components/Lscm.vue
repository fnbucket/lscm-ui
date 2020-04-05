<template>
  <div>
    <loading :active.sync="isLoading" 
    :is-full-page="fullPage"></loading>
    <h3>cols: {{cols}} rows: {{rows}}</h3>
    <v-row v-for="r in rows" :key="r">
      <v-col v-for="c in cols" :key="`${r}${c}`">
        <v-checkbox
          v-if="mappedProteins[(c+((r-1)*cols))-1]"
          :label="`${mappedProteins[(c+((r-1)*cols))-1].id}`"
          @click.stop="clicked(mappedProteins[(c+((r-1)*cols))-1])"
          :value="(mappedProteins[(c+((r-1)*cols))-1].selected)"
        >
        </v-checkbox>
      </v-col>
    </v-row>
    <v-btn @click="execute">LSCM</v-btn>
    <hr/>
    {{lscmResult}}
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';

const url = 'https://us-central1-lscm-2233.cloudfunctions.net/lscm'
const defaultProteins = [
  "B5FNU0",
  "Q4JAS3",
  "A6UDH9",
  "P01878_ALC_MOUSE",
  "Q1JLH6",
  "Q3BN23",
  "Q5U1Y9",
  "B3PYU7",
  "Q8WW18",
  "P02760_HC_HUMAN",
  "P01374_TNFB_HUMAN",
  "P24592_IBP6_HUMAN",
  "P02974_FMM1_NEIGO",
  "Q6GEK4"
]

export default {
  name: 'Lscm',
  components: {
    Loading
  },
  data () {
    return {
      lscmResult: "lscm manager",
      proteins: defaultProteins,
      cols: 3,
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    execute () {
      console.log('wtf')
      this.isLoading = true
      axios.post(url,{
        fasta_ids: this.selected
        .join(',')
      })
        .then(data => {
          console.log(data)
          this.lscmResult = data.data
      })
        .catch(e => {
          console.error(e)
        })
        .finally(()=> {
          this.isLoading = false
        })
    },
    clicked (mappedProtein) {
      console.log('this.selected.indexOf(value)', mappedProtein, this.selected.indexOf(mappedProtein.id))
      const selected = this.selected.indexOf(mappedProtein.id) > -1 ? this.selected.filter(v => v !== mappedProtein.id) : [...this.selected, mappedProtein.id]
      this.$store.commit('setSelectedIds', selected)
    },
    isSelected (value) {
      return (this.selected.indexOf(value) > -1)
    }
  },
  // watch: {
  //   selected () {
  //     console.log(this.selected.map(s => this.proteins[s]))
  //   }
  // },
  computed: {
    rows () {
      return Math.floor(this.proteins.length / this.cols) + 1
    },
    selected () {
      return this.$store.state.selectedIds
    },
    mappedProteins () {
      return this.proteins.map(
        p => {
          return {
            id: p,
            selected: this.selected.indexOf(p) > -1
          }
        }
      )
    }
  }
}
</script>

<style>

</style>