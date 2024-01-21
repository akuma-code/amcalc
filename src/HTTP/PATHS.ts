const _proxy = `https://thingproxy.freeboard.io/fetch/`
export const apiRoutes = {
    viteo: `${_proxy}https://script.google.com/macros/s/AKfycbxlyvCbfYJ2Hd9CCLVzV35WkBoV7iN4zi_3bKlLIFnoZzmoyBqS-NkX0ynSwpeop44g/exec` as const,
    iso: `${_proxy}https://script.google.com/macros/s/AKfycbwj4pgCVpKbPRdnOuLalAlpzBfRuK-Gi4EUgyjcD7Yo2lt95CkPDrxYF197M3E1n86k/exec` as const,
}

export const pageRoutes = {
    root: '/' as const,
    bento: 'bento' as const,
    getapp: 'getapp' as const,
    sill: 'sill' as const,
    test: 'test' as const,
    groups: '/sill/groups/:group_id' as const,
    print: '/sill/groups/print' as const,
}
