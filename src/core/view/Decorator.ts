export function StatusKey(name: string, key: string) {
    return "_STATUS_" + name + "_" + key
}

export function StoreKey(name: string, key: string) {
    return "_STORE_" + name + "_" + key
}


function createHookDecorator(target: any, propertyKey: string, hookName: string, hookFunc: Function) {
    Object.defineProperty(target, StatusKey(hookName, propertyKey), {
        value: true
    })
    Object.defineProperty(target, StoreKey(hookName, propertyKey), {
        value: "__FIRST_IN__",
        writable: true
    })
    Object.defineProperty(target, StoreKey(`_${hookName}_FUNC_`, propertyKey), {
        value: hookFunc
    })
}

// ---- in this situation:
// --eg @State first = 1
// --no @State second = this.first.value      (because it will treat this.first as 1)
// -yes @Derived@State second = () => this.first.value
export const Derived = (decorator: Function) =>
    (target: any, propertyKey: string) => {
        decorator(target, propertyKey)
        Object.defineProperty(target, StatusKey("DERIVED", propertyKey), {
            value: true,
        })
    }

export const Hook: Function = (hook: Function) =>
    (target: any, propertyKey: string) => {
        createHookDecorator(target, propertyKey, "HOOK", hook)
    }


export const SHook = (hook: Function) =>
    (target: any, propertyKey: string) => {
        createHookDecorator(target, propertyKey, "SHOOK", hook)
    }


export const State = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("STATE", propertyKey), {
        value: true,
    })
    Object.defineProperty(target, StoreKey("STATE", propertyKey), {
        value: "__FIRST_IN__",
        writable: true
    })
}

export const Ref = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("REF", propertyKey), {
        value: true,
    })
    Object.defineProperty(target, StoreKey("REF", propertyKey), {
        value: "__FIRST_IN__",
        writable: true
    })
}

export const Context = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("CONTEXT", propertyKey), {
        value: true,
    })
}

export const Contexts = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("CONTEXTS", propertyKey), {
        value: true,
    })
}

export const Prop = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("PROP", propertyKey), {
        value: true,
    })
}

export const DotProp = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("DOTPROP", propertyKey), {
        value: true,
        writable: true
    })

    Object.defineProperty(target, StoreKey("DOTPROP_FUNC", propertyKey), {
        value: (ruiElement: any) => (props: any) => {
            ruiElement[StoreKey("DOTPROP", propertyKey)] = props ?? "undefined"
            return ruiElement
        }
    })
}


export const Observe = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("OBSERVE", propertyKey), {
        value: true,
    })
}


export const Preset = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("PRESET", propertyKey), {
        value: true,
    })
}
