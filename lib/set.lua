local set = {}

--- @alias Set<T> { [T]: boolean }

--- Check sets equality
---
--- @generic T
--- @param a Set<T>
--- @param b Set<T>
--- @return boolean
local function __eq(a, b)
  for element in pairs(a) do
    if not b[element] then
      return false
    end
  end

  for element in pairs(b) do
    if not a[element] then
      return false
    end
  end

  return true
end

--- New set
---
--- @generic T
--- @param t T[]
--- @return Set<T>
set.new = function(t)
  local collection = {}
  for _, v in ipairs(t) do
    collection[v] = true
  end

  setmetatable(collection, {
    __eq = __eq
  })

  return collection
end

return set
