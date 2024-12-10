local File = {}
File.__index = File
File.__tostring = function(self)
  return string.format("File(%d, %d)", self.id, self.size)
end

function File.new(id, size)
  local self = setmetatable({}, File)
  self.id = id
  self.size = size
  return self
end

return File
