import Vue from "vue";
import vueList from "@7span/vue-list";
import axios from "./axios";
import qs from "qs";

Vue.use(vueList, {
  requestHandler(requestData) {
    const { endpoint, pagination, search, params, filters, sort } = requestData;
    return axios
      .get(endpoint, {
        params: {
          ...params,
          search,
          filter: filters,
          page: pagination.page,
          limit: pagination.perPage,
          sort:
            sort.order && sort.by
              ? sort.order === "asc"
                ? sort.by
                : `-${sort.by}`
              : undefined,
        },
        paramsSerializer: (params) => qs.stringify(params),
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        return {
          items: res.data,
          count: res.meta?.total,
          res: res,
        };
      });
  },
});
