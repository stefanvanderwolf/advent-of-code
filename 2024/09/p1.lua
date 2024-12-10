local Matrix = require("lib.collection.matrix")
local Set = require("lib.collection.set")
local Vec2 = require("lib.vec2")
local parser = require("lib.parser")
local LinkedList = require("lib.collection.linked_list")
local Space = require("2024.09.space")
local File = require("2024.09.file")

local p1 = {}

local function parse(input)
  local disk_map = parser.numbers(input, true)

  local file = true
  local heap = LinkedList.new()
  local id = 0
  for _, size in ipairs(disk_map) do
    if file then
      heap:append(File.new(id, size))
      id = id + 1
    else
      if size > 0 then
        heap:append(Space.new(size))
      end
    end

    file = not file
  end
  
  return heap
end


--- Solve Resonant Disk Fragmenter
---
--- @param input string
--- @return integer
p1.solve = function(input)
  local heap = parse(input)

  local head = heap.head

  while head ~= heap.tail do
    while head.value.id ~= nil do
      head = head.next
    end
    local space = head.value
    local file = heap.tail.value

    if not heap.tail.value.id then
      heap:pop()
      goto continue
    end

    if file.size < space.size then
      heap:insert(heap.tail.value, head.prev)

      space.size = space.size - file.size
      heap:pop()
    elseif file.size > space.size then
      heap:insert(File.new(file.id, space.size), head.prev)
      file.size = file.size - space.size
      heap:remove(head)
      head = head.next
    else
      heap:insert(heap.tail.value, head.prev)
      heap:remove(head)
      heap:pop()
      head = head.next
    end

      ::continue::
  end

  local i = 0
  local checksum = 0
  local current = heap.head
  while current and current.value.id do
    for j = 1, current.value.size, 1 do
      checksum = checksum + (i * current.value.id)
      i = i + 1
    end
    current = current.next
  end


  return checksum
end

return p1
