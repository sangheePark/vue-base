<template>
  <el-row>
    <el-col :span="24">
      <el-input 
        v-model="param.key" 
        placeholder="Please KEY"/>
      <el-input 
        v-model="param.label" 
        placeholder="Please LABEL"/>
      <el-table 
        :data="filterCodesJPA.list" 
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
      <el-pagination
        :total="filterCodesJPA.totalElements"
        background
        layout="prev, pager, next"
        @current-change="pageChange"/>
      <div style="margin-top: 20px">
        <el-button @click="refresh()">조회</el-button>
      </div>
    </el-col>
  </el-row>
    
</template>

<script>
import { codeQuery } from '@/apollo/codeQuery';

export default {
  apollo: {
    filterCodesJPA: {
      query: codeQuery,
      variables: {
        filter: {
        }
      },

      // result(response) {
      //   this.list = response.data.filterCodesJPA.list
      //   this.totalElements = response.data.filterCodesJPA.totalElements
      // }
    }
  },
  data() {
    return {
      size: 10,
      page: 1,
      param: {
        key: '',
        label: ''
      }
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    refresh() {
      this.size = 10
      this.page = 1
      this.search()
    },
    search() {
      // fetchList().then(response => {
      //   this.list = response.data.items.slice(0, 8)
      // })
      console.log('this.$apollo.queries.filterCodesJPA.refetch()');
      // this.$apollo.queries.filterCodesJPA.refetch()
      const vm = this;
      const filter = {
        page: this.page,
        size: this.size
      }

      const params = [];
      for (const name in this.param) {
        if (this.param[name] != '') {
          params.push(name)
        }
      }

      if (params.length > 0) {
        const param = {}
        params.forEach(function (p) {
          param[p] = vm.param[p]
        })
        filter.param = param
      }

      this.$apollo.queries.filterCodesJPA.fetchMore({
        variables: {
          filter: filter
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newList = fetchMoreResult.filterCodesJPA.list
          return {
            filterCodesJPA: {
              __typename: previousResult.filterCodesJPA.__typename,
              list: [...newList],
              totalElements: fetchMoreResult.filterCodesJPA.totalElements
            }
          }
        }
      })
    },
    pageChange(currentPage) {
      console.log('pageChange');
      this.page = currentPage
      this.search()
    }
  }
} 
</script>
