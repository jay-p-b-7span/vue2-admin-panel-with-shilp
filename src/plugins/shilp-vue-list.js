import $axios from "@/plugins/axios";
import qs from "qs";
export default {
  requestHandler(data) {
    const { endpoint, filters, params, search, pagination, sort } = data;

    const vars = {
      ...params,
      filter: filters,
      search,
      perPage: pagination.perPage,
      page: pagination.page,
    };

    if (sort && sort.by) {
      vars.sort = sort;
    }

    return $axios
      .get(endpoint, {
        params: {
          ...vars,
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
        };
      });
  },
};
