
<template>
  <ApolloQuery
    :query="require('@/apollo/codeQuery.js')"
    :variables="{ 
      filter: {
        page: page,
        size: size,
        param: {
          key: key,
          label: label
        }
      } 
    }"
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div 
        v-if="loading" 
        class="loading apollo">Loading...</div>

      <!-- Error -->
      <div 
        v-else-if="error" 
        class="error apollo">An error occured</div>

      <!-- Result -->
      <div 
        v-else-if="data" 
        class="result apollo">
        <el-table 
          :data="data.list" 
          style="width: 100%;padding-top: 15px;">
          <el-table-column 
            label="Value" 
            min-width="200">
            <template slot-scope="scope">
              {{ scope.row.value }}
            </template>
          </el-table-column>
          <el-table-column 
            label="Label" 
            width="195" 
            align="center">
            <template slot-scope="scope">
              {{ scope.row.label }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- No result -->
      <div 
        v-else 
        class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>

export default {
  data() {
    return {
      size: 10,
      page: 1,
      key: '',
      label: ''
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    search() {
      // fetchList().then(response => {
      //   this.list = response.data.items.slice(0, 8)
      // })
      console.log('this.$apollo.queries.filterCodesJPA.refetch()');
      this.$apollo.queries.filterCodesJPA.refetch()
    },
    pageChange(currentPage) {
      console.log('pageChange');
      this.page = currentPage
      this.search()
    }
  }
}
</script>
