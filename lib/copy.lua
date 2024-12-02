local copy = {}

copy.shallow = function(t)
    local shallow = {}
    for key, value in pairs(t) do
        shallow[key] = value
    end
    return shallow
end

return copy
