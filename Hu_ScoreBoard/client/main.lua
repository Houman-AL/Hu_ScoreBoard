-- My Discord: Houman#7172

local MaxCurrentPlayer = Config.MaxCurrentPlayer

local AllAdmins = 0

local IsLightMode = false

local AllPlayers = {}

local ToggleScoreBoard = false

local ServerName = Config.ServerName

local All_Jobs = {}

function GetLightOrDarkMode()
	IsLightMode = GetResourceKvpString('IsLightMode')
	if IsLightMode ~= nil then
		IsLightMode = true
	else
		IsLightMode = false
	end
end

CreateThread(function()
	Wait(1000)
	while not NetworkIsSessionActive() do
		Wait(500)
	end
	SendNUIMessage({
		type = 'tolightmode',
	})
	SendNUIMessage({
		type = 'todarkmode',
	})
	SendNUIMessage({
		type = 'toggleon',
	})
	SendNUIMessage({
		type = 'toggleoff',
	})
	SetNuiFocus(true, true)
	GetLightOrDarkMode()
	if IsLightMode then
		SendNUIMessage({
			type = 'tolightmode',
		})
	else
		SendNUIMessage({
			type = 'todarkmode',
		})
	end
	SetNuiFocus(false, false)
	ToggleScoreBoard = false
	SendNUIMessage({
		type = 'SetServerName',
		name = ServerName,
	})
end)

RegisterNetEvent('Hu_ScoreBoard:SendPlayers')
AddEventHandler('Hu_ScoreBoard:SendPlayers', function(allplayer, admins, alljobs)
	local allplayer2 = {}
	local Players = 0
	local MyName = 'LOADING...'
	local MyPing = 'LOADING...'
	local MyPerm = 'LOADING...'
	for _,i in pairs(allplayer) do
		Players = Players + 1
		allplayer2[tonumber(_)] = i
		if tonumber(_) == tonumber(GetPlayerServerId(PlayerId())) then
			MyName = tostring(i.name)..string.format('[%s]', tostring(i.id))
			MyPing = i.ping
			MyPerm = i.perm
		end
	end

	AllPlayers = allplayer2
	AllAdmins = admins
	All_Jobs = alljobs

	if ToggleScoreBoard then
		SendNUIMessage({
			type = 'data',
			AllPlayers = AllPlayers,
			Players = tostring(Players),
			MaxPlayer = MaxCurrentPlayer,
			AllAdmins = tostring(admins),
	
			MyName = MyName,
			MyPing = MyPing,
			MyPerm = MyPerm,

			police = All_Jobs['police'],
			sheriff = All_Jobs['sheriff'],
			ambulance = All_Jobs['ambulance'],
			mechanic = All_Jobs['mechanic'],
			taxi = All_Jobs['taxi'],
		})
	end
end)

function ToggleF10(bool)
	ToggleScoreBoard = bool
	if ToggleScoreBoard then
		SetNuiFocus(true, true)
		SendNUIMessage({
			type = 'toggleon',
		})
		local Players = 0
		local MyName = 'LOADING...'
		local MyPing = 'LOADING...'
		local MyPerm = 'LOADING...'
		for _,i in pairs(AllPlayers) do
			Players = Players + 1
			if tonumber(_) == tonumber(GetPlayerServerId(PlayerId())) then
				MyName = tostring(i.name)..string.format('[%s]', tostring(i.id))
				MyPing = i.ping
				MyPerm = i.perm
			end
		end
		SendNUIMessage({
			type = 'data',
			AllPlayers = AllPlayers,
			Players = tostring(Players),
			MaxPlayer = MaxCurrentPlayer,
			AllAdmins = tostring(AllAdmins),
			MyName = MyName,
			MyPing = MyPing,
			MyPerm = MyPerm,

			police = All_Jobs['police'],
			sheriff = All_Jobs['sheriff'],
			ambulance = All_Jobs['ambulance'],
			mechanic = All_Jobs['mechanic'],
			taxi = All_Jobs['taxi'],
		})
		SetNuiFocus(true, true)
	else
		SetNuiFocus(false, false)
		SendNUIMessage({
			type = 'toggleoff',
		})
		SendNUIMessage({
			type = 'cleardata',
		})
		SetNuiFocus(false, false)
	end
end

RegisterNUICallback('copydiscordlink', function(data, cb)
	SendNUIMessage({
		type = 'copydiscordlink',
		link = Config.DiscordLink
	})
end)

local IsChangingMode = false

RegisterNUICallback('datas', function(data, cb)
    local datas = data

	if datas.togglelightmode == true then
		if not IsChangingMode then
			IsChangingMode = true
			if not IsLightMode then
				SendNUIMessage({
					type = 'tolightmode',
				})
				IsLightMode = true
				SetResourceKvp('IsLightMode', 'true')
			else
				SendNUIMessage({
					type = 'todarkmode',
				})
				IsLightMode = false
				DeleteResourceKvp('IsLightMode')
			end
			CreateThread(function()
				Wait(850)
				IsChangingMode = false
			end)
		end
	elseif datas.toggleoff == true then
		ToggleF10(false)
	end
end)


local IsChangeingF10 = false
RegisterCommand('Open_Hu_ScoreBoard', function(source, args)
	if not IsChangeingF10 then
		IsChangeingF10 = true
		ToggleF10(not ToggleScoreBoard)
		CreateThread(function()
			Wait(1250)
			IsChangeingF10 = false
		end)
	end
end)

RegisterKeyMapping('Open_Hu_ScoreBoard', 'Open Scoreboard', 'keyboard', 'f10')

-- My Discord: Houman#7172