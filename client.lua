local client = {}
client.execIsOpen = false


client.openExec = function()
    if client.execIsOpen then return end
    client.execIsOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "open"
    })
end


client.closeExec = function()
    client.execIsOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = "close"
    })
end


RegisterNUICallback("xyz-executor:code", function(data, cb)
    local func = load(tostring(data.code))

    if func then
        func()
    end
    
    cb(1)
end)


RegisterNUICallback("xyz-executor:close", function(data, cb)
    client.execIsOpen = false
    SetNuiFocus(false, false)

    cb(1)
end)



ESX.SecureNetEvent("xyz-executor:open", client.openExec)