local server = {}

server.start = function()
    SetTimeout(1000, function()
        print("^2Succesfully Stared " .. GetCurrentResourceName())
    end)
end

server.start()


server.exec = function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    if xPlayer.getGroup() == "admin" then
        TriggerClientEvent("xyz-executor:open", source)
    end
end

RegisterCommand("executor", function(source, args)
    server.exec(source)
end)