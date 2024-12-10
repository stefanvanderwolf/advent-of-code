local Set = require("lib.collection.set")
local LinkedList = require("lib.collection.linked_list")
local parser = require("lib.parser")
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

  local is_space = function(node)
    return node and node.value.id == nil
  end

  local moved = Set.new()

  local head = heap.head

  local current_node = heap.tail
  while current_node ~= nil do
    if is_space(current_node) then
      current_node = current_node.prev
    elseif moved:contains(current_node.value) then
      current_node = current_node.prev
    else
      local head = heap.head
      while head ~= nil do
        if head == current_node then
          head = nil
        elseif is_space(head) and head.value.size >= current_node.value.size then
          break
        else
          head = head.next
        end
      end

      if head == nil then
        current_node = current_node.prev
      else
        if current_node.prev == head then
          heap:insert(Space.new(head.value.size), current_node)
        elseif current_node.prev ~= head then
          if is_space(current_node.prev) or is_space(current_node.next) then
            local d = 0
            if is_space(current_node.prev) then
              d = d + current_node.prev.value.size
              heap:remove(current_node.prev)
            end
            if is_space(current_node.next) then
              d = d + current_node.next.value.size
              heap:remove(current_node.next)
            end

            heap:insert(Space.new(current_node.value.size + d), current_node)
          else
            heap:insert(Space.new(current_node.value.size), current_node)
          end
        end

        if current_node.value.size == head.value.size then
          heap:insert(current_node.value, head)
          heap:remove(head)
        else
          head.value.size = head.value.size - current_node.value.size
          heap:insert(current_node.value, head.prev)
        end
        moved:insert(current_node.value.id)
        heap:remove(current_node)
        current_node = current_node.prev
      end
    end
  end

  local i = 0
  local checksum = 0
  local current = heap.head
  while current do
    if not current.value.id then
      i = i + current.value.size
    else
      for _ = 1, current.value.size, 1 do
        checksum = checksum + (i * current.value.id)
        i = i + 1
      end
    end
    current = current.next
  end

  return checksum
end

return p1
