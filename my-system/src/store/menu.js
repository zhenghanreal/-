import Cookie from 'js-cookie'
export default{
    mutations:{
        CHANGEMENU(state){
            state.isCollapse = !state.isCollapse
        },
        SELECTMENU(state,val){
            if( val.name !== 'home' ){
                const index =  state.tablist.findIndex(item=>item.name === val.name)
                if(index === -1){
                    state.tablist.push(val)
                }
            }
        },
        REMOVETAG(state,item){
            const  index = state.tablist.findIndex(val =>val.name === item.name )
            state.tablist.splice(index,1)
        },
        SETMENU(state,val){
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        ADDMENU(state,router){
            //判断缓存中是否有数据
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item =>{
                        item.component = ()=> import(`../pages/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = ()=> import(`../pages/${item.url}`)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })
        }
    },
    state:{
        isCollapse: false,
        tablist:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
              },
        ],
        menu:[]
    }
}