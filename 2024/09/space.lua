local Space = {}
Space.__index = Space
Space.__tostring = function(self)
  return string.format("Space(%d)", self.size)
end

function Space.new(size)
  local self = setmetatable({}, Space)
  self.size = size
  return self
end

return Space
