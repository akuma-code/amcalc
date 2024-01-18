import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { QueryFunctionContext } from 'react-query/types/core/types';
import { api } from "../HTTP/api";
import { $api } from "../HTTP/axios";

type QueryKeyT = [string, object | undefined];



export const fetcher = <T>({
    queryKey,
    pageParam
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
    const [url, params] = queryKey;
    return api
        .get<T>(url, { params: { ...params, pageParam } })
        .then((res) => res.data);
};

export const useFetch = <T>(
    url: string | null,
    params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
    const meta = {}
    const query = useQuery<T, Error, T, QueryKeyT>(
        [url!, params],
        ({ queryKey }) => fetcher<T>({ queryKey, meta }),
        {
            enabled: !!url,
            ...config,
        }
    )

    return query;
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
    const queryClient = useQueryClient();
    const meta = {}
    return () => {
        if (!url) {
            return;
        }

        queryClient.prefetchQuery<T, Error, T, QueryKeyT>(
            [url!, params],
            ({ queryKey }) => fetcher<T>({ queryKey, meta })
        );
    };
};