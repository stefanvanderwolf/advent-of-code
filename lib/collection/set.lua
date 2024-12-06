--- @class Set
--- @field private _storage table
local Set = {}

Set.__index = Set

--- Check sets equality
---
--- @generic T
--- @param a Set
--- @param b Set
--- @return boolean
Set.__eq = function(a, b)
  for element in a:iter() do
    if not b:contains(element) then
      return false
    end
  end

  for element in b:iter() do
    if not a:contains(element) then
      return false
    end
  end

  return true
end

Set.__tostring = function(self)
  local result = "Set: { "
  local i = 0
  for _, value in pairs(self._storage) do
    i = i + 1
    result = result .. tostring(value)
    if i < self.count then
      result = result .. ", "
    end
  end
  result = result .. " }"
  return result
end

--- @return Set
function Set.new()
  local self = setmetatable({}, Set)
  self._storage = {}
  self.count = 0
  return self
end

--- @generic Element
--- @param iterable `Element`[]
--- @return Set
function Set.from(iterable)
  local set = Set.new()
  for _, element in ipairs(iterable) do
    set:insert(element)
  end
  return set
end

--- Insert value into set
---
--- @param element any
--- @return Set
function Set:insert(element)
  local hash = self:_tohash(element)
  if self._storage[hash] == nil then
    self._storage[hash] = element
    self.count = self.count + 1
  end

  return self
end

--- Get value or nil if not found
---
--- @generic T
--- @param value `T`
--- @return T?
function Set:get(value)
  return self._storage[self:_tohash(value)]
end

--- Get value or nil if not found
function Set:remove(value)
  self._storage[self:_tohash(value)] = nil
  return self
end

--- @generic T
--- @param value `T`
--- @return boolean
function Set:contains(value)
  return self:get(value) ~= nil
end

function Set:iter()
  local key, value = nil, nil
  return function()
    key, value = next(self._storage, key)
    return value
  end
end

--- @private
--- @param element any
--- @return any
function Set:_tohash(element)
  if type(element) == "table"
      and type(element["tohash"]) == "function" then
    return element:tohash()
  end
  return element
end

return Set
