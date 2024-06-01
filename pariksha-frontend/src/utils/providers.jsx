"use client";

import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

export function Providers({ children }) {
	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools />
				{children}
			</QueryClientProvider>
		</ChakraProvider>
	);
}
