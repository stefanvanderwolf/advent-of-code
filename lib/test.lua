local prefix = "───"
local header = arg[0]
local postfix = string.rep("─", 80 - #header + #prefix)

print(string.format("\27[1m%s%s%s\27[0m", prefix, header, postfix))

--- @param time number
--- @return string
local function format(time)
  if time > 3.0 then
    return string.format("\27[31m%.2fs\27[0m", time)
  end

  if time > 1.0 then
    return string.format("\27[33m%.2fs\27[0m", time)
  end

  local milliseconds = time * 1000
  if milliseconds > 1.0 then
    return string.format("%.2fms", milliseconds)
  end

  return string.format("%.2fµ", milliseconds * 1000)
end

--- @param name string
--- @param fn fun(it: fun(name: string, test: fun()))
local function describe(name, fn)
  print(string.format("\27[1m%s\27[0m", name))

  --- @param description string
  --- @param test fun()
  local function it(description, test)
    local x = os.clock()

    local result = xpcall(test, function(err)
      print(string.format("\27[31mx %s (%s)\27[0m", description, format(os.clock() - x)))
      print(string.format("%s", err))
    end)

    if result then
      print(string.format("✓ %s (%s)", description, format(os.clock() - x)))
    end
  end

  xpcall(fn, function(err)
    print(string.format("\27[31mx %s\27[0m", name))
    print(string.format("%s", err))
  end, it)
end

return describe
