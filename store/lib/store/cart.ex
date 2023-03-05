defmodule Store.Cart do
  use GenServer

  @item_price %{
    "item1" => 100,
    "item2" => 100,
    "item3" => 500,
    "item4" => 200,
    "item5" => 110,
    "item6" => 290,
    "item7" => 320,
    "item8" => 200
  }
  @spec start_link(term()) :: term()
  def start_link(opts) do
    GenServer.start_link(__MODULE__, %{}, name: Keyword.fetch(opts, :name))
  end

  def user_join(%{id: user_id}) do
    GenServer.call(__MODULE__, :join_user)
  end

  def init(_opts) do
    # to be changed on getting submit
    {:ok, %{
      "items" => %{
      },
      "users" => 0,
      "submit_user" => 0
    }}
  end
end
