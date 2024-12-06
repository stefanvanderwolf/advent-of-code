--- TODO: generics broken, also not really supported anyway

--- @class Cycle
--- @field private _storage table
--- @field public index integer
local Cycle = {}

Cycle.__index = Cycle

Cycle.__tostring = function (self)
    local result = "Cycle: { "
    for i = 1, #self._storage do
        result = result .. tostring(self._storage[i])
        if i < #self._storage then
            result = result .. ", "
        end
    end
    result = result .. " }"
    return result
end

function Cycle.new()
  local self = setmetatable({}, Cycle)
  self.index = 0
  self._storage = {}
  return self
end

--- @generic Element
--- @param iterable `Element`[]
--- @return Cycle
function Cycle.from(iterable)
  local set = Cycle.new()
  for _, element in ipairs(iterable) do
    set:insert(element)
  end
  return set
end

function Cycle:insert(value)
  table.insert(self._storage, value)
  return self
end

function Cycle:next()
  self.index = (self.index % #self._storage) + 1
  return self._storage[self.index]
end

function Cycle:iter()
  local index = 0
  return function()
    index = (index % #self._storage) + 1
    return self._storage[index]
  end
end

return Cycle
