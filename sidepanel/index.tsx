import React from "react"

import Main from "~components/Main"

import "../style.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"

import { store } from "~StateManagment/store"
import { ThemeProvider } from "~theme/ThemeProvider"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
    mutations: {}
  }
})

export default function index() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  )
}
