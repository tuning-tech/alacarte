defmodule StoreWeb.CartChannel do
  @moduledoc """
  Channel module for cart room
  """
  use Phoenix.Channel
  require Logger
  alias Store.Cart

  @impl true
  def join("store:" <> room_id, params, socket) do
    DynamicSupervisor.start_child(
      RoomSupervisor, {Cart, name: String.to_atom(room_id), params: params})
    |> case do
      {:ok, _child} ->
        "yo"
      {:error, {:already_started, _child}} ->
        Cart.user_join(params)
    end

    {:ok, socket}
  end

  @impl true
  def handle_in("store-gid", _params, socket) do
    #
  end

  @impl true
  def terminate(_reason, socket) do
    socket
  end
end
