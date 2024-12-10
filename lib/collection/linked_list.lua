local Node = {}
Node.__index = Node

function Node.new(value)
  local self = setmetatable({}, Node)
  self.prev = nil
  self.value = value
  self.next = nil
  return self
end

local LinkedList = {}
LinkedList.__index = LinkedList
LinkedList.__tostring = function(self)
  local result = "LinkedList: {\n"
  local current = self.head
  while current do
    if not current.value.id then
      result = result .. "\27[1m"
    end
    result = result .. tostring(current.value)
    if not current.value.id then
      result = result .. "\27[0m"
    end
    current = current.next
    if current ~= nil then
      result = result .. ",\n"
    end
  end
  result = result .. "\n}"
  return result
end

function LinkedList.new()
  local self = setmetatable({}, LinkedList)
  self.head = nil
  self.tail = nil
  return self
end

function LinkedList:pop()
  if self.tail == nil then
    return nil
  end

  local value = self.tail.value
  self.tail = self.tail.prev
  self.tail.next = nil
  return value
end

function LinkedList:append(value)
  local node = Node.new(value)
  if not self.head then
    self.head = node
    self.tail = node
  else
    node.prev = self.tail
    self.tail.next = node
    self.tail = node
  end
end

function LinkedList:insert(value, after)
  if after.next == nil then
    return self:append(value)
  end
  local node = Node.new(value)

  local tmp = after.next
  tmp.prev = node

  node.next = tmp
  node.prev = after
  after.next = node
end

function LinkedList:remove(node)
  if node.next == nil then
    self.tail = self.tail.prev
    self.tail.next = nil
  else
    local next = node.next
    local prev = node.prev

    prev.next = next
    if next ~= nil then
      next.prev = prev
    end
  end
end

return LinkedList
