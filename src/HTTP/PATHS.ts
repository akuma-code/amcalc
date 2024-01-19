const _proxy = `https://thingproxy.freeboard.io/fetch/`
export const apiRoutes = {
    viteo: `${_proxy}https://script.google.com/macros/s/AKfycbwXPBV66vrnLuHyBo-dtO46jPJvMHAuPMvhMCahub_8EBidiupF1sZ7lvsoJI0oi7_T/exec` as const,
    iso: `${_proxy}https://script.google.com/macros/s/AKfycbwj4pgCVpKbPRdnOuLalAlpzBfRuK-Gi4EUgyjcD7Yo2lt95CkPDrxYF197M3E1n86k/exec` as const,
}

export const pageRoutes = {
    root: '/' as const,
    bento: 'bento' as const,
    getapp: 'getapp' as const,
    sill: 'sill' as const,
    groups: '/sill/groups/:group_id' as const,
    print: '/sill/groups/print' as const,
}
